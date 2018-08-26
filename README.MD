# Bamazon
* By Kate Christian | [Portfolio: k8xian.github.io](https://k8xian.github.io)

* An Amazon-like storefront demonstrating MySQL skills learned during week 12 of Northwestern University's Full Stack Flex Coding Bootcamp

**Deployment:** [k8xian.github.io/bamazon](https://k8xian.github.io/bamazon)

## Instructions
* clone this [repository](https://github.com/k8xian/bamazon.git) to your computer
* cd into the repo
* run **npm install**
* copy the schema.sql file into your MySQL database
* copy the seeds.sql file to fill the new database with data for demo purposes

## Operations

### Customer View
* begin by typing **node bamazonCustomer**
* you will see a list of all available products [demo](/screenshots/customer/1_customer_initial-list.png)
* type the ID number of a product you would like to purchase
* type the quantity of products you would like to purchase
* the output will inform you of the details of your purchase including a calculated total price and end the session [demo](/screenshots/customer/2_customer_initial-purchase.png)
* upon next initiation of a session, the stock will be updated [demo](/screenshots/customer/3_customer_updated-stock.png)
* if there is insufficient inventory, you will be informed and asked to choose another product [demo](/screenshots/customer/4_customer_failed-purchase.png)

### Manager View
* begin by typing **node bamazonManager**
* you will see a menu of four options
    * **View Products for Sale** allows you to see the current list of products, prices and inventory [demo](/screenshots/manager/2_manager_view-all-products-including-added.png)
    * **View Low Inventory** highlights the products that have an inventory less than 5[demo] (/screenshots/manager/5_manager_low-inventory.png)
    * **Add to Inventory** allows you to update the quantity of certain inventory items [demo](/screenshots/manager/3_manager_add-inventory.png)
      * upon reload you will see updated inventory [demo](/screenshots/manager/4_manager_view-products-updated-inventory)
    * **Add New Product** allows you to add a new product to the database[demo](/screenshots/manager/1_manager_add-product.png)
