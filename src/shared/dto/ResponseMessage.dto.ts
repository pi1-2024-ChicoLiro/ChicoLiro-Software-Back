interface ResponseMessage {
  success: boolean;
  message?: string;
  data?: any;
}

export class ResponseMessageDto {
  success: boolean;
  message?: string;
  data?: any;

  constructor(response: ResponseMessage) {
    this.success = response.success;
    this.message = response.message || '';
    this.data = response.data || [];
  }
}
