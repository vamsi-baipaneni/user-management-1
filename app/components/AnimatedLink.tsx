"use client";
import Link, {LinkProps} from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';

type Props = LinkProps & {
  children: React.ReactNode;
  href: string;
}

const sleep = (timer: number): Promise<void>=>{
  return new Promise((res,rej)=>{
    setTimeout(res,timer);
  })
}

const AnimatedLink = ({children, href, ...props}: Props) => {

  const handleAnimation = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    e.preventDefault();

    const body = document.querySelector('#childpage');
    body?.classList.add("page-transition");
    await sleep(500);
    router.push(href);
    await sleep(1000);
    body?.classList.remove("page-transition");
  }
  const router = useRouter();
  return (
    <Link href={href} {...props} onClick={handleAnimation}>{children}</Link>
  )
}

export default AnimatedLink