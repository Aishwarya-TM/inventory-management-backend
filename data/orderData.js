const orderData = 
[
    {
        "clientName": "John Doe",
        "address": "123 Main Street, Springfield, IL",
        "description": "Plumbing supplies for residential construction",
        "orderdate": "2024-10-07T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-15T00:00:00.000Z",
        "Paymentterms": "Net 30",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "PVC Pipe",
                "price": 12.50,
                "quantity": 100,
                "taxRate": 7.5
            },
            {
                "productName": "PEX Tubing",
                "price": 2.50,
                "quantity": 500,
                "taxRate": 7.5
            }
        ]
    },
    {
        "clientName": "Alice Smith",
        "address": "456 Oak Street, Chicago, IL",
        "description": "HVAC equipment for commercial use",
        "orderdate": "2024-09-28T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-05T00:00:00.000Z",
        "Paymentterms": "Net 15",
        "deliverymethod": "Air Freight",
        "products": [
            {
                "productName": "Copper Pipe",
                "price": 58.25,
                "quantity": 200,
                "taxRate": 8.0
            },
            {
                "productName": "HDPE Pipe",
                "price": 9.99,
                "quantity": 150,
                "taxRate": 7.5
            }
        ]
    },
    {
        "clientName": "Bob Johnson",
        "address": "789 Pine Avenue, Denver, CO",
        "description": "Industrial piping materials",
        "orderdate": "2024-10-01T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-12T00:00:00.000Z",
        "Paymentterms": "Net 45",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "Galvanized Steel Pipe",
                "price": 45.99,
                "quantity": 75,
                "taxRate": 8.0
            },
            {
                "productName": "Stainless Steel Pipe",
                "price": 120.00,
                "quantity": 50,
                "taxRate": 7.5
            }
        ]
    },
    {
        "clientName": "Charlie Green",
        "address": "654 Cedar Street, Portland, OR",
        "description": "Supplies for irrigation systems",
        "orderdate": "2024-10-03T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-10T00:00:00.000Z",
        "Paymentterms": "Net 30",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "Aluminum Irrigation Pipe",
                "price": 32.50,
                "quantity": 250,
                "taxRate": 7.5
            },
            {
                "productName": "Flexible Drainage Pipe",
                "price": 3.75,
                "quantity": 600,
                "taxRate": 7.0
            }
        ]
    },
    {
        "clientName": "David Martin",
        "address": "321 Birch Street, Seattle, WA",
        "description": "Residential heating and ventilation materials",
        "orderdate": "2024-09-29T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-06T00:00:00.000Z",
        "Paymentterms": "Net 60",
        "deliverymethod": "Air Freight",
        "products": [
            {
                "productName": "Chimney Pipe",
                "price": 65.00,
                "quantity": 120,
                "taxRate": 7.5
            },
            {
                "productName": "PEX Tubing",
                "price": 2.50,
                "quantity": 1000,
                "taxRate": 7.0
            }
        ]
    },
    {
        "clientName": "Emily Wright",
        "address": "999 Maple Road, Austin, TX",
        "description": "Sewage and drainage materials for infrastructure",
        "orderdate": "2024-10-05T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-14T00:00:00.000Z",
        "Paymentterms": "Net 45",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "Cast Iron Pipe",
                "price": 75.50,
                "quantity": 150,
                "taxRate": 8.0
            },
            {
                "productName": "Corrugated Plastic Pipe",
                "price": 5.00,
                "quantity": 300,
                "taxRate": 7.0
            }
        ]
    },
    {
        "clientName": "Frank Harris",
        "address": "222 Elm Street, Miami, FL",
        "description": "Electrical installation materials",
        "orderdate": "2024-10-04T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-13T00:00:00.000Z",
        "Paymentterms": "Net 30",
        "deliverymethod": "Air Freight",
        "products": [
            {
                "productName": "PVC Conduit",
                "price": 7.25,
                "quantity": 400,
                "taxRate": 7.0
            },
            {
                "productName": "Copper Pipe",
                "price": 58.25,
                "quantity": 200,
                "taxRate": 7.5
            }
        ]
    },
    {
        "clientName": "Grace Lee",
        "address": "789 Spruce Lane, Las Vegas, NV",
        "description": "Plumbing supplies for residential water systems",
        "orderdate": "2024-10-02T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-08T00:00:00.000Z",
        "Paymentterms": "Net 30",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "PVC Pipe",
                "price": 12.50,
                "quantity": 250,
                "taxRate": 7.5
            },
            {
                "productName": "CPVC Pipe",
                "price": 15.00,
                "quantity": 150,
                "taxRate": 7.0
            }
        ]
    },
    {
        "clientName": "Henry White",
        "address": "543 Willow Avenue, Phoenix, AZ",
        "description": "Industrial and gas pipe installations",
        "orderdate": "2024-10-05T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-12T00:00:00.000Z",
        "Paymentterms": "Net 45",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "Brass Pipe",
                "price": 28.00,
                "quantity": 400,
                "taxRate": 7.5
            },
            {
                "productName": "Stainless Steel Pipe",
                "price": 120.00,
                "quantity": 50,
                "taxRate": 7.5
            }
        ]
    },
    {
        "clientName": "Ivy Adams",
        "address": "123 Palm Street, Dallas, TX",
        "description": "HVAC and plumbing supplies",
        "orderdate": "2024-09-27T00:00:00.000Z",
        "expectedshipmentdate": "2024-10-03T00:00:00.000Z",
        "Paymentterms": "Net 30",
        "deliverymethod": "Ground Shipping",
        "products": [
            {
                "productName": "HDPE Pipe",
                "price": 9.99,
                "quantity": 300,
                "taxRate": 7.0
            },
            {
                "productName": "Copper Pipe",
                "price": 58.25,
                "quantity": 150,
                "taxRate": 7.5
            }
        ]
    }
]

module.exports = orderData