import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Markdown from 'react-markdown';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/components/ui/dialog';
import rehypeRaw from 'rehype-raw';

type Props = {
  src: string;
  label: string;
};

const LearnMore = ({ src, label }: Props) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(src).then(async (data) => {
      const text = await data.text();
      setContent(text);
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} className='p-0'>{label}</Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl max-h-screen overflow-y-auto prose lg:prose-xl'>
        <Markdown
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </Markdown>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMore;
