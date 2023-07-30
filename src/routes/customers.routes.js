import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { getCustomers, getCustomersById, insertCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { customerSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomersById);
customersRouter.post('/customers', validateSchema(customerSchema), insertCustomer);
customersRouter.put('/customers/:id', validateSchema(customerSchema), updateCustomer)


export default customersRouter;