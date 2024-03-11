import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from 'dotenv'
import { Users } from "./collections/Users";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { ProductFiles } from "./collections/ProductFile";

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  })
export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media, Orders, ProductFiles],
    routes: {
        admin: '/sell',
    },
    admin:{
        user: "users",
        bundler: webpackBundler(),
        meta:{
            titleSuffix:"- MixKitStudios",
            favicon: "/favicon.ico",
            ogImage:"/thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript:{
        outputFile: path.resolve(__dirname,"payload-types.ts"),
    },
})