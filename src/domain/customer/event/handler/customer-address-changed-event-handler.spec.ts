import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import ShowMessageWhenCustomerAddressIsCreated from "./show-message-when-customer-address-is-changed.handler";
import { v4 as uuid } from "uuid";

describe("Customer changed events tests", () => {
    it("should register and notify event handler for changed customer", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ShowMessageWhenCustomerAddressIsCreated();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
 
        const customer = new Customer(uuid(), "Daniel");
        customer.changeAddress(new Address("Street Name", 20, "12120000", "City Name"));
        const customerChangedEvent = new CustomerAddressChangedEvent({customer});
    
        eventDispatcher.notify(customerChangedEvent);
    
        expect(spyEventHandler).toHaveBeenCalled();

      });
});