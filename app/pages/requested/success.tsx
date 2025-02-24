import { Button } from '~/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

const RequestSuccess = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Reservation Requested</CardTitle>
          <CardDescription className='text-center'>
            After reviewing your request, a member of our team will contact you.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center items-center'>
          <Button variant={'default'}>View Portfolio</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RequestSuccess;
