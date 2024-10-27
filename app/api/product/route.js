// app/api/product/route.js by id

import { NextResponse } from "next/server";

const products = [
    {
        id: 1,
        name: "Áo thun",
        category: "Quần áo",
        price: 150000,
        rating: 3,
        imgurl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/119/564/products/ao-thun-nu-han-quoc-s6432.jpg'
    },
    {
        id: 2,
        name: "Quần jeans",
        category: "Quần áo",
        price: 450000,
        rating: 4,
        imgurl: 'https://dokistore.com/upimages/products/Jean/DK-04/quan-jean-nam-doki_(29).JPG'
    },
    {
        id: 3,
        name: "Giày thể thao",
        category: "Giày dép",
        price: 800000,
        rating: 5,
        imgurl: 'https://streetstyleshop.vn/wp-content/uploads/2022/05/the-thao-nam-chat-10.jpg'
    },
    {
        id: 4,
        name: "Túi xách",
        category: "Phụ kiện",
        price: 600000,
        rating: 4,
        imgurl: 'https://gencesaigon.com/wp-content/uploads/2023/11/tui-xach-tay-nu-gence-cao-cap-tx13-1.jpg'
    },
    {
        id: 5,
        name: "Đồng hồ",
        category: "Phụ kiện",
        price: 1200000,
        rating: 5,
        imgurl: 'https://bizweb.dktcdn.net/100/133/174/files/dong-ho-nam-oblvlo-dragon-luxury-rong-3.jpg'
    },
    {
        id: 6,
        name: "Mũ lưỡi trai",
        category: "Phụ kiện",
        price: 100000,
        rating: 4,
        imgurl: 'https://vn-test-11.slatic.net/p/62a52999e3b49642b37ef260ddc20467.jpg'
    },
    {
        id: 7,
        name: "Áo khoác",
        category: "Quần áo",
        price: 550000,
        rating: 4,
        imgurl: 'https://shopmebi.com/wp-content/uploads/2023/11/ao-gio-2-mat-nam-uniqlo-mau-xanh-den_69_453850_edited.jpeg'
    },
    {
        id: 8,
        name: "Giày cao gót",
        category: "Giày dép",
        price: 650000,
        rating: 4,
        imgurl: 'https://giaythainguyen.com/wp-content/uploads/2021/04/1.jpg'
    },
    {
        id: 9,
        name: "Áo len",
        category: "Quần áo",
        price: 300000,
        rating: 4,
        imgurl: 'https://dosi-in.com/images/detailed/339/dosiin-fiin-ao-len-co-lo-tron-chat-minao-len-co-cao-len-long-tho-nhieu-mau-ulzzang-made-by-fiina339480.jpg'
    },
    {
        id: 10,
        name: "Quần short",
        category: "Quần áo",
        price: 200000,
        rating: 3,
        imgurl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/460/639/products/z4433936132052-c5d0ead1b0f0a85144dd2805611b86c5-min.jpg'
    },
    {
        id: 11,
        name: "Giày sandal",
        category: "Giày dép",
        price: 400000,
        rating: 4,
        imgurl: 'https://product.hstatic.net/200000876207/product/sandal_di_hoc_nam_nu_be_trai_be_gai_berich__7__752248fa59f1423d87ce8c67424349fe_master.jpeg'
    },
    {
        id: 12,
        name: "Túi tote",
        category: "Phụ kiện",
        price: 700000,
        rating: 4,
        imgurl: 'https://vn-test-11.slatic.net/p/a8c84accbbe765499305940301631cb7.png'
    },
    {
        id: 13,
        name: "Kính mát",
        category: "Phụ kiện",
        price: 500000,
        rating: 4,
        imgurl: 'https://www.chapi.vn/img/product/2021/6/24/kinh-mat-nam-phong-cach-co-dien-roupai-14-new.jpg'
    },
    {
        id: 14,
        name: "Áo sơ mi",
        category: "Quần áo",
        price: 250000,
        rating: 3,
        imgurl: 'https://cavino.vn/wp-content/uploads/2020/07/914-1.jpg'
    },
    {
        id: 15,
        name: "Quần tây",
        category: "Quần áo",
        price: 350000,
        rating: 4,
        imgurl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/471/821/products/73a9c08fdfec39ab3d98b0320041c278.png'
    },
    {
        id: 16,
        name: "Giày bốt",
        category: "Giày dép",
        price: 900000,
        rating: 5,
        imgurl: 'https://product.hstatic.net/1000037727/product/giay_bot_nam_cao_co_da_that_100__ma_c32__1__81c509ef39e14140b7f0cbdbfcc16ea3_1024x1024.png'
    },
    {
        id: 17,
        name: "Túi đeo chéo",
        category: "Phụ kiện",
        price: 800000,
        rating: 4,
        imgurl: 'https://bizweb.dktcdn.net/100/044/266/products/tui-deo-cheo-sieu-nhe-thiet-ke-toi-da-tien-ich-kingbag-bamboo-2ok.jpg'
    },
    {
        id: 18,
        name: "Mũ beanie",
        category: "Phụ kiện",
        price: 150000,
        rating: 4,
        imgurl: 'https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-ltm2y4hpndul28'
    }
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product);
}
