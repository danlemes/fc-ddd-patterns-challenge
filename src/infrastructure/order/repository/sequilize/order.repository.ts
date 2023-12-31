import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    
    entity.items.forEach((item) => {
      OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        },
        {
          where: {
            id: item.id,
          },
        });
    })

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }    
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] });

    let orderItems: OrderItem[] = [];

    orderModel.items.forEach((item) => {
      orderItems.push(new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
    })

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
   }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

    const orders = orderModels.map((orderModel) => {
      let orderItems: OrderItem[] = [];
      
      orderModel.items.forEach((item) => {
        orderItems.push(new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      })
      
      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    })
    
    return orders;
    
  }
}
