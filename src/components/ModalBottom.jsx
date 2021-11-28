import React, {useState, useEffect} from 'react'

const ModalBottom = ({data,order}) => {

    const [addOn, setAddOn] = useState(0)
    const [breadItems, setBreadItems] = useState('')
    const [price, setPrice] = useState(205.00)

    useEffect(()=>{
        let addOns=0, breadItems=[], keys  
        if(order){
            keys = Object.keys(order)
        }
        keys.forEach((key)=>{
            if(order[key].constructor === Array){
                addOns += order[key].length
            } else{
                breadItems.push(order[key])
            }
        })
        setBreadItems(breadItems.join(', '))
        setAddOn(addOns)
    },[order, data])

    useEffect(()=>{
        const totalPrice = order && order['Add On'] && order['Add On'].reduce((acc, item)=> acc + item.price, 205)
        setPrice(totalPrice)
    },[order, price])

    return (
        <div className='modal--bottom modalCta'>
            <div className="modalCta__info">
                <span className="modalCta__items">{breadItems}</span>
                { addOn > 0 && <span className="modalCta__addOn">+{addOn} Add On</span>}
            </div>
            <div className="modalCta__btn">
                <span className="modalCta__price">Total &#8377; {price}
                </span>
                <span className="modalCta__text">Add Item</span>
            </div>
        </div>
    )
}

export default ModalBottom
