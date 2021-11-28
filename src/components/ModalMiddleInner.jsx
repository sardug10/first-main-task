import React from 'react'
import foodMark from '../images/foodMark.png'

const ModalMiddleInner = ({choices, limit, category, order, onChoiceItemChange}) => {

    const ifItemExistsInOrder = (order, name, item)=>{
        let flag = false
        order[name].forEach((choice, index)=>{
            if(JSON.stringify(choice) === JSON.stringify(item)) {
                flag = true
            }
        })
        return flag
    }

    return (
        <>
            {
                choices && order && choices.map((innerEl, innerIdx)=>(
                                <div className={`modalItems__div` + (innerEl.available === false ? ' modalItems__div--disable' : '') } key={innerIdx}>
                                    <img src={foodMark} className='modalSummary__food-mark' alt="food-mark" />
                                    {
                                        limit === 1 ? 
                                        (
                                            <input 
                                                key={innerIdx} 
                                                className='modalItems__input' 
                                                type='radio' 
                                                id={innerEl.name} 
                                                name={category.name} 
                                                value={innerEl.name} 
                                                checked={innerEl.name === order[category.name] && limit===1? true : false}
                                                onChange={()=>onChoiceItemChange(category, innerIdx, 'radio')}
                                            />
                                        ) : 
                                        (
                                            <input 
                                                key={innerIdx} 
                                                className='modalItems__input' 
                                                type='checkbox'
                                                id={innerEl.name} 
                                                name={category} 
                                                value={innerEl.name} 
                                                checked={order && order[category.name] && ifItemExistsInOrder(order, category.name, innerEl)? true : false}
                                                onChange={()=>onChoiceItemChange(category, innerIdx, 'checkbox')}
                                            />
                                        )
                                    }
                                    <label className={'modalItems__label' + (innerEl.available === false ? ' modalItems__label--disable' : '')} htmlFor={innerEl.name}>{innerEl.name}</label>
                                    { innerEl.price && <span className="modalItems__price">&#8377; {innerEl.price}</span>}
                                    { innerEl.available === false && <span className="modalItems__tag">Unavailable</span>}
                                </div>
                ))
            }
        </>
    )
}

export default ModalMiddleInner
