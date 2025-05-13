// 'use client'

// import { useEffect, useState } from 'react';
// import Image from "next/image";
// import styles from "./page.module.css";
import TopRatedMovies from "@/components/top_rated_movies";

export default function Home() {
    return (
        <>
            <p>Dashboard</p>
            <TopRatedMovies />
        </>
    );
}
