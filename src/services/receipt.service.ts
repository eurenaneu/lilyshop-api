import { Repository } from "typeorm";
import { Receipt } from "../models/receipt";
import dataSource from "../database/datasource";
import { ReceiptItem } from "../models/receiptItem";
import { ReceiptNotFound } from "../error/receipt.error";
import { ReceiptDTO } from "../schemas/receipt.schema";
import { User } from "../models/user";
import { PaymentMethod } from "../models/paymentMethod";
import { UserNotFound } from "../error/user.error";

export class ReceiptService {
  constructor(private readonly receiptRepository: Repository<Receipt>) {}

  async getAll(): Promise<Receipt[] | null> {
    return await this.receiptRepository.find({ relations: ["user", "receipt_item"] });
  }

  async getReceiptById(receiptId: string): Promise<Receipt | null> {
    return await this.receiptRepository.findOne({
      where: { id: receiptId },
      relations: ["user", "order", "payment_method", "receipt"]
    });
  }

  async createReceipt(receiptData: ReceiptDTO): Promise<Receipt> {
    return await dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const [user, paymentMethod] = await Promise.all([
          transactionalEntityManager.findOneBy(User, { id: receiptData.user.id }),
          transactionalEntityManager.findOneBy(PaymentMethod, { id: receiptData.paymentMethod.id })
        ]);

        if (!user) {
          throw new UserNotFound();
        }

        if (!paymentMethod) {
          throw new Error("Método de pagamento inválido: Não existe");
        }

        const receipt = transactionalEntityManager.create(Receipt, {
          receiptData,
          user: user,
          paymentMethod: paymentMethod,
          totalPrice: receiptData.totalPrice,
        });

        const savedReceipt = await transactionalEntityManager.save(Receipt, receipt);

        const receiptItems = await transactionalEntityManager.findBy(ReceiptItem, {
          receipt: { id: receipt.id },
        });

        for (const item of receiptItems) {
          const receiptItem = transactionalEntityManager.create(ReceiptItem, {
            product: item.product,
            receipt: savedReceipt,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.subtotal,
          });

          await transactionalEntityManager.save(ReceiptItem, receiptItem);
        }

        return savedReceipt;
      }
    );
  }

  async deleteReceipt(receiptId: string): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOneBy({ id: receiptId });

    if (!receipt) {
      throw new ReceiptNotFound();
    }

    return await this.receiptRepository.remove(receipt);
  }
}
