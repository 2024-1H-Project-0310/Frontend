/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/display-name */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useState, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  NumberInputOwnerState,
} from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';
import { DateTimePicker } from '@mui/x-date-pickers';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactQuill = dynamic(async () => import('react-quill'), {
  ssr: false,
});

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

// numberInput 컴포넌트
const NumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-slate-400 dark:hover:border-slate-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-slate-400 dark:border-slate-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
                : 'border-slate-300 dark:border-slate-600 shadow-md shadow-slate-100 dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit] dark:text-slate-300 px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        incrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className,
            ),
          };
        },
        decrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  ),
);
function page() {
  const [category, setcategory] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [joinImmediately, setJoinImmediately] = useState(true);
  const [editorHtml, setEditorHtml] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    const tempImages: string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      // 이미지 파일만 추가하도록 필터링
      if (file.type.startsWith('image/')) {
        tempImages.push(URL.createObjectURL(file));
      }
    }
    setImages((prevImages) => [
      ...prevImages,
      ...tempImages.slice(0, 8 - prevImages.length),
    ]);
  };

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { register, handleSubmit } = useForm();
  const today = dayjs();

  const onSubmit = (data: any) => {
    console.log(data); // 이곳에서 form 데이터를 처리합니다.
  };

  const handleChange = (event: SelectChangeEvent) => {
    setcategory(event.target.value as string);
  };

  // 텍스트 에디터 내용이 변경될 때 호출되는 콜백 함수
  const handleEditorChange = (html: any) => {
    setEditorHtml(html);
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-20">
      <div className="flex flex-col w-[67.5rem] h-full">
        {/* 제목 입력 및 카테고리 선택 */}
        <div className="flex flex-row w-full h-12 ">
          <form
            className="flex w-full mr-4 border border-1 p-2 border-zinc-300"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="글 제목을 입력하세요"
              className="flex w-full focus:outline-none"
            />
          </form>

          <FormControl className="flex w-40 h-12" fullWidth>
            <InputLabel className="flex h-full">카테고리</InputLabel>
            <Select
              value={category}
              label="카테고리"
              onChange={handleChange}
              style={{ borderRadius: 0 }}
              className="flex w-full h-full"
            >
              <MenuItem value="Category1">Category1</MenuItem>
              <MenuItem value="Category2">Category2</MenuItem>
              <MenuItem value="Category3">Category3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 장소 선택 */}
        <div className="flex flex-row w-full mt-8 h-60">
          <div className="flex flex-col justify-end w-1/2 ">
            <p className="flex text-sm text-zinc-300">
              모임 장소를 입력해 주세요!
            </p>
            <div className="flex flex-row w-full mt-4 h-12">
              <p className="flex w-full  border border-1 justify-start items-center pl-2 text-zinc-300 border-zinc-300 mr-4">
                주소
              </p>
              <button className="btn w-32 h-12 text-white bg-[#E6E1E1] hover:bg-[#C7B7B7]">
                주소 검색
              </button>
            </div>
            <form className="flex w-full mt-4 mr-4 border border-1 border-zinc-300">
              <input
                {...register('address', { required: true })}
                type="text"
                placeholder="상세 주소"
                className="flex w-full h-12 focus:outline-none p-2"
              />
            </form>
          </div>
          <div className="flex w-1/2 h-60 border border-zinc-300 ml-4" id="map">
            <Script
              src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
              strategy="beforeInteractive"
            />
            <Map
              center={{ lat: 33.450701, lng: 126.570667 }}
              style={{ width: '100%', height: '100%' }}
            ></Map>
          </div>
        </div>

        {/* 날짜 선택 */}
        <p className="flex text-sm text-zinc-300 mt-12">
          약속 날짜를 입력해 주세요!
        </p>
        <div className="flex w-full mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="flex w-80"
              label="날짜 선택"
              value={today}
            />
          </LocalizationProvider>
        </div>

        {/* 인원수 선택 */}
        <p className="flex text-sm text-zinc-300 mt-12">
          본인을 포함해 모일 최대 인원수를 입력해 주세요!
        </p>
        <div className="flex flex-row w-full mt-4">
          {' '}
          <NumberInput
            aria-label="Demo number input"
            // endAdornment={
            //   <InputAdornment
            //     className="flex pt-6 -ml-6"
            //     position="end"
            //     component="div"
            //   >
            //     명
            //   </InputAdornment>
            // }
            placeholder="인원수"
            value={numPeople}
            onChange={(event, val: any) => setNumPeople(val)}
            min={0}
            max={99}
          />
        </div>

        {/* 참가 방식 결정 */}
        <p className="flex text-sm text-zinc-300 mt-12">
          참가 방식을 선택해 주세요!
        </p>
        <div className="flex flex-row w-72 h-16 justify-start items-center rounded-2xl mt-4 bg-gray-200 shadow-md p-4">
          <div
            className="absolute w-32 h-12 justify-center items-center rounded-2xl bg-gray-100 shadow-md"
            style={{
              transform: joinImmediately ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <p
            className="flex w-1/2 text-lg justify-center text-zinc-500 font-bold z-10 cursor-pointer"
            onClick={() => setJoinImmediately(true)}
          >
            즉시 참가
          </p>
          <p
            className="flex w-1/2 text-lg justify-center text-zinc-500 font-bold z-10 cursor-pointer"
            onClick={() => setJoinImmediately(false)}
          >
            승인 후 참가
          </p>
        </div>

        <div className="flex w-full h-full flex-col mt-12">
          {/* React-Quill 컴포넌트 */}
          <ReactQuill
            theme="snow" // 에디터의 테마 설정
            value={editorHtml} // 현재 편집 중인 HTML 내용
            onChange={handleEditorChange} // 내용이 변경될 때 호출되는 콜백 함수
            className="w-full h-96"
            placeholder="어떤 모임을 가질 지 설명해주세요!"
          />
        </div>

        {/* 이미지 업로드 */}
        <p className="flex text-sm text-zinc-300 mt-20">
          모임 대표 사진을 업로드해 주세요! (최대 8장)
        </p>

        <div className="flex flex-row w-full h-auto overflow-x-scroll">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {images.length < 8 && (
            <label
              htmlFor="fileInput"
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'blue',
              }}
              onClick={handleFileInputChange}
            >
              <div className="flex w-28 h-28 border border-1 justify-center items-center border-zinc-300 m-3 text-black cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </label>
          )}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <Image
                src={image}
                alt={`Uploaded ${index}`}
                className="flex border border-1 border-zinc-300 m-3 cursor-pointer"
                width={112}
                height={112}
              />
              {hoveredIndex === index && (
                <div
                  className="absolute w-28 h-28 flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-200 bg-opacity-70 cursor-pointer"
                  onClick={() => handleImageDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => handleImageDelete(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-end w-full mt-12">
          <button className="btn w-32 h-12 text-white bg-[#E6E1E1] hover:bg-[#C7B7B7]">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
