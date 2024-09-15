import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Backpack, Loader, View } from 'lucide-react'
import { TogglePreview } from '../../../../context/ResumeInfoContext'
import { BsBack } from 'react-icons/bs'

const PreviewBtn = () => {
    const { isClicked, setIsClicked } = useContext(TogglePreview)

    return (
        <div className='block md:hidden text-end'>
            <Button onClick={() => {
                setIsClicked(!isClicked)
            }} className="gap-1 ">
                <View size="17px" /> Preview
            </Button>

        </div>
    )
}
export default PreviewBtn

const Back = () => {
    const { isClicked, setIsClicked } = useContext(TogglePreview)

    return (

        <div className='block md:hidden text-end'>
            {isClicked &&
                <Button onClick={() => {
                    setIsClicked(!isClicked)
                }} className="gap-1 ">
                    <BsBack size="17px" /> Back
                </Button>
            }

        </div>
        
    )
}

export { Back }
