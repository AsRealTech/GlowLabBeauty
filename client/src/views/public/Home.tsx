import { RenderMission } from "../../components/Public/RenderMission";
import { RenderTips } from "../../components/Public/RenderTips";
import { RenderProducts } from "../../components/Public/RenderProducts";
import { RenderIngredients } from "../../components/Public/RenderIngredients";
import { RenderHero } from "../../components/Public/RenderHero";

export function Home() {

    return(

        <>
        
            <RenderHero/>
            <RenderIngredients />
            <RenderProducts />
            <RenderTips />
            <RenderMission />
        </>
    )
}