import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='bg-earth bg-cover'>
      <div className='justify-center flex content-center flex-col h-screen w-full'>
        <div className='flex pb-28 text-center flex-col box-border m-10'>
            <h1 className='text-7xl text-morning-blue font-nunito pb-9 max-mid:text-5xl break-normal'>COMPANIES OF EARTH</h1>
            <p className='text-morning-blue text-xl font-nunito-italic italic max-big:text-lg max-mid:text-base break-normal'>These are the top companies all over the world</p>
            <div className=' pt-9'>
                <Link to="/Planet">
                    <button className='text-text-blue-dark font-nunito bg-button-blue shadow-[0_0px_5px_3px_rgba(88,86,181,0.3)] font-bold text-xs font py-3 px-24 rounded-2xl'>GET STARTED</button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
