const Icons = {
  media: [
    'play',
    'pause',
    'volume-down',
    'volume-mute',
    'volume-up',
    'fullscreen',
    'fullscreen-exit',
  ] as const,
  arrow: [
    'arrow-right-s',
    'arrow-left-s',
    'arrow-down-circle',
    'arrow-down',
    'arrow-down-s',
  ] as const,
  business: [
    'mail-add',
    'mail-check',
    'mail-close',
    'mail-download',
    'mail',
    'mail-forbid',
    'mail-lock',
    'mail-open',
    'mail-send',
    'mail-settings',
    'mail-star',
    'mail-unread',
    'mail-volume',
  ] as const,
  system: ['lock-password', 'eye', 'eye-off'] as const,
  user: ['user', 'robot', 'robot-2'] as const,
  design: ['shapes'] as const,
};

type IconKeys = keyof typeof Icons;
type IconNames = (typeof Icons)[IconKeys][number];
type ExtractKeyByValue<V> = {
  [K in IconKeys]: V extends (typeof Icons)[K][number] ? K : never;
}[keyof typeof Icons];

type IconProps<T extends IconNames> = JSX.IntrinsicElements['svg'] & {
  name: T;
  variant?: 'fill' | 'line';
  category?: ExtractKeyByValue<T>;
  size?: number;
};
export function Icon<T extends IconNames>(props: IconProps<T>) {
  const {
    name,
    variant = 'line',
    category,
    width,
    height,
    size = 24,
    fill = 'white',
    ...rest
  } = props;
  const iconWidth = width ?? size ?? 24;
  const iconHeight = height ?? size ?? 24;

  const cat =
    category || Object.keys(Icons).find((key) => (Icons[key as IconKeys] as any).includes(name));
  return (
    <svg width={iconWidth} height={iconHeight} fill={fill} {...rest}>
      <use
        width={iconWidth}
        height={iconHeight}
        xlinkHref={`/svg/remixicon.${cat}.svg#${'ri-' + name + '-' + variant}`}
      />
    </svg>
  );
}
