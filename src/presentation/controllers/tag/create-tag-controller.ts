import { MissingParamError } from "../../../validations/errors";
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../protocols";

export class CreateTagController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError("name"));
  }
}
