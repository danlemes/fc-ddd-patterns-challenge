import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ShowMessageWhenCustomerAddressIsCreated implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ` + event.eventData.customer.id + ` - ` + event.eventData.customer.name 
                + ` alterado para: ` + event.eventData.customer.Address); 
  }
}
