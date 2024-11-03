import { NextResponse } from "next/server";

const categories = [
    { id: 1, name: "Quần áo" },
    { id: 2, name: "Giày dép" },
    { id: 3, name: "Phụ kiện" }
];

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Quần áo"
 */
export async function GET(request) {
    return NextResponse.json(categories);
}