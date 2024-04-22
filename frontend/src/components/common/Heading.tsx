const Heading = ({ title }: { title: string }) => {
  return (
    <div className='my-2'>
      <h1 className='text-green-400 font-bold text-4xl'>{title}</h1>
    </div>
  );
};

export default Heading;
