import React, { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

interface Props {
  indicator?:
    | 'circle'
    | 'circle-outline'
    | 'ellipse'
    | 'ellipse-outline'
    | 'fill'
    | 'outline'
    | 'none';

  insert?: 'top' | 'bottom';
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  positionOnMobile?: 'top-center' | 'bottom-center';
  elevation?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;
  rounded?: boolean;
  outlined?: boolean;
  paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  distanceFromBaseHorizontal?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  distanceFromBaseVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  distanceFromBaseHorizontalMobile?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  distanceFromBaseVerticalMobile?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  bodyTypographyVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'inherit';

  headingTypographyVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'inherit';

  displayCount?: number;
}

const OakNotification = (props: Props) => {
  const elementRef = useRef();

  useEffect(() => {
    (elementRef.current as any)!.outlined = props.outlined;
  }, [props.outlined]);

  useEffect(() => {
    (elementRef.current as any)!.rounded = props.rounded;
  }, [props.rounded]);

  return (
    <oak-notification
      ref={elementRef}
      elevation={props.elevation}
      paddingVertical={props.paddingVertical}
      indicator={props.indicator}
      displayCount={props.displayCount}
      insert={props.insert}
      position={props.position}
      distanceFromBaseHorizontal={props.distanceFromBaseHorizontal}
      distanceFromBaseVertical={props.distanceFromBaseVertical}
      distanceFromBaseHorizontalMobile={props.distanceFromBaseHorizontalMobile}
      distanceFromBaseVerticalMobile={props.distanceFromBaseVerticalMobile}
      bodyTypographyVariant={props.bodyTypographyVariant}
      headingTypographyVariant={props.headingTypographyVariant}
      positionOnMobile={props.positionOnMobile}
    />
  );
};

export default OakNotification;
