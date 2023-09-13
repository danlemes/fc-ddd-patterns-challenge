import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class ShowMessageWhenCustomerAddressIsCreated implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ` + event.eventData.customer.id + ` - ` + event.eventData.customer.name 
                + ` alterado para: ` + event.eventData.customer.Address); 
  }
}
