import React, { useState } from 'react'
import UsageItems from './UsageItems';

function Usage() {
    const [step, setStep] = useState(UsageItems);
  return (
    <div className="ml-2">
      <h1 className="font-bold text-center text-lg">
        Planting Healthy Forests
      </h1>
      <p>
        Tree Pact Kenya (TPK) is a GIS mapping program designed to help forest
        managers, stake holders and administrative officers match seedlots with
        planting sites based on available land for Afforestation, Trees
        nurseries and Species matching.
      </p>
      <div className="mt-4 ">
        {step.map((item, index) => {
          return (
            <div key={index} className="flex flex-row mb-2 scroll-smooth">
              <div className='mr-2'>
                {/* <img src={item.icon} className='object-cover rounded-md' /> */}
                <span className='object-cover items-center'>{item.icon}</span>
              </div>
              <div>
                <h3 className='font-bold'>{item.id} {item.title}</h3>
                <p className='tracking-tight'>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Usage