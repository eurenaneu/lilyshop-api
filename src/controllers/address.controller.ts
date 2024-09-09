import { AddressSchema } from "../schemas/address.schema";
import { Address } from "../models/address";
import { AddressService } from "../services/address.service";
import { HttpResponse, HttpStatus } from "../utils/httpResponse";
import { Request } from "express";
import { AddressNotFound } from "../error/address.error";
import { BaseError } from "../error/base.error";

export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  async getAll(): Promise<HttpResponse<Address[]>> {
    const addresses = await this.addressService.getAll();

    if (addresses.length === 0) {
      return new HttpResponse(HttpStatus.NO_CONTENT, addresses);
    }
    
    return new HttpResponse(HttpStatus.OK, addresses);
  }

  async getAddress(
    addressId: string
  ): Promise<HttpResponse<Address | unknown>> {
    try {
      const address = await this.addressService.getAddress(addressId);

      return new HttpResponse(HttpStatus.OK, address);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async createAddress(
    addressRequest: Request
  ): Promise<HttpResponse<Address | unknown>> {
    try {
      const addressDTO = AddressSchema.parse(addressRequest.body);
      const address = await this.addressService.createAddress(addressDTO);

      return new HttpResponse(HttpStatus.CREATED, address);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async patchAddress(
    addressId: string,
    addressRequest: Request
  ): Promise<HttpResponse<Address | unknown>> {
    try {
      const addressDTO = AddressSchema.parse(addressRequest.body);
      const address = await this.addressService.patchAddress(
        addressId,
        addressDTO
      );

      return new HttpResponse(HttpStatus.OK, address);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message)
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deleteAddress(
    addressId: string
  ): Promise<HttpResponse<Address | unknown>> {
    try {
      const address = await this.addressService.deleteAddress(addressId);

      return new HttpResponse(HttpStatus.OK, address);
    } catch (error) {
      if (error instanceof AddressNotFound) {
        return new HttpResponse(HttpStatus.NO_CONTENT, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
