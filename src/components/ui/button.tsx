import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@root/lib/utils';
import { Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer',
        outline:
          'border border-primary text-primary bg-transparent hover:bg-secondary cursor-pointer',
        secondary: 'bg-secondary text-primary hover:bg-secondary/50',
        ghost:
          'hover:bg-secondary hover:text-secondary-foreground cursor-pointer',
        link: 'text-primary underline-offset-4 hover:underline',
        blue: 'bg-blue-700 text-white rounded-[5px] hover:bg-blue-800',
        wowIcon: 'hover:grayscale-0',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9',
        sort: 'h-7 px-2 py-4 rounded-[6px]',
        custom: 'h-7 rounded-md px-3',
        trash: 'h-8 w-8',
        wowIcon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  tooltip?: string;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading,
      tooltip,
      tooltipSide = 'top',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Comp
                disabled={disabled || loading}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
              >
                {!loading ? (
                  children
                ) : (
                  <Loader2 className='h-5 w-5 animate-spin' />
                )}
              </Comp>
            </TooltipTrigger>
            <TooltipContent side={tooltipSide}>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Comp
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!loading ? children : <Loader2 className='h-5 w-5 animate-spin' />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
