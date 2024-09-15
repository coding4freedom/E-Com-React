import React from 'react';

export default function Price({ sale, original }) {
  return (
    <div className="book__price">
        {sale ? (
            <>
                <span className="book__price--normal">${original.toFixed(2)}</span>
                ${sale.toFixed(2)}
            </>
        ) : (
           `$${original.toFixed(2)}`
            
        )}        
    </div>
  )
}
