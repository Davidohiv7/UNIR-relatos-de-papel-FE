### Models

## Book:

- id: number
- title: string
- author: string
- description: string
- images: string[]
- ranking: number
- language: string
- type: fisico o digital
- year: number
- categories: BookCategory[]
- price: number
- stock: number

## BookCategory

- id: number
- name: string

## Customer

- id: number
- firstName: string
- lastName: string
- email: string
- order: Order[]

## BookOrder

- id: number
- bookId: number
- orderId: number
- quantity: number

## Order

- id: number
- customerId: number
- books: BookOrder[]
- status: string
