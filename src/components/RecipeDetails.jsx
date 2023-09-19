import { Col, Button } from "react-bootstrap"
import { useAtom } from "jotai"
import { RecipeOverlay } from "../atoms/recipeOverlay"

export function RecipeDetails(id,){
    const [overlayData, setOverlayData] = useAtom(RecipeOverlay)
    return (
        <div key={id}>
            <h1>This is recipe details</h1>
            <Col><Button onClick={() => setOverlayData([])}>See Recipe</Button></Col>
        </div>
    )
}