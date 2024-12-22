import { Sidebar } from './sidebar';

export function Builder() {
  return (
    <div className='h-screen flex flex-col lg:flex-row-reverse relative'>
      <div className='basis-2/3 h-screen w-2/3 fixed top-0 left-0'>
        {/* <img src={sections[0].coverUrl}  className='h-full w-full object-cover' /> */}
      </div>
      <div className='basis-1/3'>
        <Sidebar />
      </div>
    </div>
  );
}
