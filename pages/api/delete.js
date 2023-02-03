//import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
export default async (req,res) => {
    req.body.url.map( async url => {
        //let st = req.body.url.split('/',2)
        const dir = `./public${url}`
        fs.unlink(dir,() => console.log("done"))
    } )
    res.status(200).json({response: "DELETED"})
}