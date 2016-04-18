Model List
==========

1. Users

1. Refs: Subscription, Movie Queue, Address, Billing

2. Products

1. Refs: Reviews

3. Reviews

1. Refs: User, Product

4. Subscriptions
5. Orders

1. Refs: User

6. Billing

1. Refs: User

7. Movie Queue

1. Refs: User, Products

8. Address

1\. User
--------

1. Email

1. email, required

2. First Name

1. string

3. Last Name

1. string

4. Password

1. string, required

5. Facebook

1. ….

6. Google

1. ….

7. Subscription

1. Ref to Object

8. Movie Queue
9. Address

1. Ref to Object

10. Preferences

1. Array of strings

11. Renewal Date

1. Date of subscription order

12. Past Billing

1. Ref to Billing

13. Reviews??

2\. Products/Video
------------------

1. Title

1. string, required

2. Year

1. year

3. Description

1. string

4. Inventory

1. number, hidden from user

5. Category

1. Array of Strings

6. Tags

1. Array of Strings

7. Photos

1. Array of string urls

8. Trailer

1. String

9. Reviews

1. Array of Refs

3\. Review
----------

1. Video

1. Ref to Video

2. User

1. Content

3. Rating

1. Number

4. Date created

1. Date

5. Best for (tags)

1. Array of Strings

4\. Subscriptions 
------------------

1. Name

1. String

2. Price

1. Number

3. \# of Movies Allowed

1. Number

5\. Orders
----------

1. User

1. Ref to User

2. Delivery Content

1. Array of Products

3. Address

1. User.Address

4. Date

1. Date

6\. Billing
-----------

1. User

1. Ref to User

2. Date

1. Date of billing cycle

3. Total

1. Number, price of subscription

7\. Movie Queue
---------------

1. Product Queue

1. Array

1. Product

1. Movie id ref

2. Status

1. pending, active, completed

3. Order Ref (optional)
4. Review

1. Ref to order

5. Index

1. Number, Rank priority of Movies in Queue

8\. Address
-----------

1. Name
2. Street Address
3. State
4. Zip