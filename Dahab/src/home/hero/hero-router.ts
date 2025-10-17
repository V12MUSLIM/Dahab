
import express from 'express'
import { addHero } from './hero-controller/add-hero';
import { Hero } from './hero-model';
import { RequestHandler } from 'express';




const router = express.Router();
//  section:string;
//     image: string;
//     title: string;
//     subtitle: string;
//     badge: string;
//     primaryCta: {
//         label: string;
//         href: string;
//         icon: string;
//     };
//     secondaryCta: {
//         label: string;
//         href: string;
//         icon: string;
//     };
//     stats: {
//         icon: string;
//         text: string;
//     }[];

router.get("/:section",async (req, res)=> {
    const { section } = req.params;

    const hero = await Hero.find({section:section }).select("-_id -__v").exec();
    // select("image title subtitle badge primaryCta secondaryCta stats").exec();
    console.log(hero);
    
    if (!hero) return res.status(404).json({ message: "Section not found" });

    res.json(hero);
});



router.post('/add',addHero)




export default router;