import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import ShowFirstMessageWhenCustomerIsCreated from "./show-first-message-when-customer-is-created.handler";
import ShowSecondMessageWhenCustomerIsCreated from "./show-second-message-when-customer-is-created.handler";
import { v4 as uuid } from "uuid";

describe("Customer created events tests", () => {
    it("should register and notify all event handlers for created customer", () => {

        const eventDispatcher = new EventDispatcher();
        const firstEventHandler = new ShowFirstMessageWhenCustomerIsCreated();
        const secondEventHandler = new ShowSecondMessageWhenCustomerIsCreated();

        const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
        const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");
    
        eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
    
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);
 
        const customer = new Customer(uuid(), "Customer Created");
        const customerCreatedEvent = new CustomerCreatedEvent({customer});
    
        eventDispatcher.notify(customerCreatedEvent);
    
        expect(spyFirstEventHandler).toHaveBeenCalled();
        expect(spySecondEventHandler).toHaveBeenCalled();

      });   
});