import { useMemo, useState } from 'react';
import ContactStep from './contact-step';
import VenueStep from './venue-step';
import { Typography } from '~/components/ui/typography';
import { DialogTitle } from '~/components/ui/dialog';

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(
    () => [
      {
        title: 'Contact Details',
        description: 'Provide us with your contact information.',
        Content: ContactStep,
      },
      {
        title: 'Venue Details',
        description:
          'Event location details would help us to provide you with the best service.',
        Content: VenueStep,
      },
    ],
    []
  );

  const StepComponent = steps[currentStep].Content;

  return (
    <div className=''>
      <DialogTitle className='space-y-5'>
        <div className='flex gap-20 pt-5'>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium ${
                index === currentStep ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>

        <Typography variant={'small'} appearance={'muted'}>
          {steps[currentStep].description}
        </Typography>
      </DialogTitle>

      <div className='py-5'>
        <StepComponent
          next={() => {
            setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
          }}
          previous={() => setCurrentStep((s) => Math.max(0, s - 1))}
        />
      </div>
    </div>
  );
}
