import dynamic from 'next/dynamic';


//다이나믹하게 import 하는 방법..!!!
//-> ssr이 아니라 csr으로 변경
const GridLoader = dynamic(
    () => import('react-spinners').then(lib => lib.GridLoader),
    {
        ssr: false,
    }
)
type Props = {
    color?: string;
}

export default function GridSpinner({ color = 'red' }: Props) {
    return (
        <GridLoader color={color} />
    );
}

