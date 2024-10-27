import { NextResponse } from "next/server";

const categories = [
    { id: 1, name: "Quần áo" },
    { id: 2, name: "Giày dép" },
    { id: 3, name: "Phụ kiện" }
];

export async function GET(request) {
    return NextResponse.json(categories);
}