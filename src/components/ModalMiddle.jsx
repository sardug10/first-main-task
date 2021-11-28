import React from 'react'
import ModalMiddleInner from './ModalMiddleInner';

const ModalMiddle = ({data, order, onOrderChange}) => {

    return (
        <div className='modal--middle modalItems'>

            {
                data && data.map((el, idx)=>(
                    <div key={idx} id={el.category}>
                        <h3 className="modalItems__heading">{el.category} {el.limit !== 1 && el.limit !== -1 ? `Any (${el.limit})` : ''}</h3>
                        { el.optional && <span className='modalItems__optional'>(optional)</span>}
                        <ModalMiddleInner choices={el.choices} limit={el.limit} category={{name:el.category, idx}} order={order} onChoiceItemChange={onOrderChange}/>
                    </div>
                ))
            }
        </div>
    )
}

export default ModalMiddle
