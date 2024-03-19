'use client';
import SearchForm from '@/components/SearchForm';
import SearchUserCard from '@/components/SearchUserCard';
import { SearchUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import useDebounce from '@/hooks/useDebounce';

export default function SearchUser() {
    const [searchText, setSearchText] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

    //serachText가 변경될때마다 api호출을 함 -> 너무 자주 호출하는건 성능에 좋지않음
    //성능 개선 방법
    //1.Debounce : 입력이나 행동이 끝난뒤,  특정 시간 기다린후 호출
    //2.Throttle : 특정 시간 기다렸다가 호출
    // const { data: users, isLoading, error } = useSWR<ProfileUser[]>(`/api/user/${searchText}`);

    const debouncedSearch = useDebounce(searchText);
    const { data: users, isLoading, error } = useSWR<SearchUser[]>(`/api/search/${debouncedSearch}`);

    return (
        <>
            <SearchForm searchText={searchText} onChange={handleChange} />

            {error && <p className='text-center'>error...</p>}
            {isLoading && (<div className='flex justify-center pt-5'><GridSpinner /></div>)}
            {
                !isLoading && !error && users?.length === 0 && (
                    <p className='text-center'>&apos;{searchText}&apos;에 해당하는  사용자가 없음</p>
                )
            }
            {
                users && (
                    <ul className='flex flex-col gap-2'>
                        {
                            users.map((user, idx) => (
                                <li key={idx} className=''>
                                    <SearchUserCard user={user} />
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    );
}
