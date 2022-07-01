import * as React from 'react';
import { useEffect } from 'react';


export default function Room() {
 
  
  useEffect(() => {
      console.log('use Effect')
  }, []);

  return (
    <div>
      <h1> sala 1 </h1>
     
    </div>


  );
}
