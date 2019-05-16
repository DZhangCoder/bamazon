# Bamazon
### What is Bamazon?
Bamazon is a CLI APP, an Amazon-like storefront that will take in orders from customers and track the updated inventory, as well as sending the calculation of total cost to customers. For Managers, Bamazon can help them with easy-to-operate functions including: view products for sale, view low inventory, add to inventory,and add new product. 

### How to use Bamazon?
There are two ways to use Bamazon, depending on whether you are a customer or a manager. 

**For Customer:**
1. Open bamazonCustomer.js file. 
2. Open your terminal and run the code `npm install` to install all the dependencies necessary to run the app. 
3. In your terminal, run the code `node bamazonCustomer.js` and you will see a list of all available sale items with their ids, names, and prices. The app will also ask you the id of the product that you would like to buy. 
![Image](assets/C1.png)
4. Put in the ID (ex.2) and units of the product (ex.100) that you would like to buy. If the units didn't exceed the inventory, it will show you the units left in stock and updated units in stock, price per unit, and your total cost of purchase. 
![Image](assets/C2.png)
If the units exceeded the inventory, the app will alert you "Insufficient quantity", and prevent the order from going through. 
