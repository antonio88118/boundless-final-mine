-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2024 年 04 月 18 日 02:48
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `boundless_final`
--

-- --------------------------------------------------------

--
-- 資料表結構 `jam_apply`
--

CREATE TABLE `jam_apply` (
  `id` int(8) NOT NULL,
  `juid` varchar(16) NOT NULL,
  `former_uid` varchar(16) NOT NULL,
  `applier_uid` varchar(16) NOT NULL,
  `applier_play` int(2) NOT NULL,
  `message` text NOT NULL,
  `state` tinyint(2) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `jam_apply`
--

INSERT INTO `jam_apply` (`id`, `juid`, `former_uid`, `applier_uid`, `applier_play`, `message`, `state`, `created_time`, `valid`) VALUES
(3, '6q3SoqnuPEXJ', 'n500ef48Ibat', 'n500ef48Ib22', 1, '我想加入!', 4, '2024-03-14 00:24:41', 0),
(4, '6q3SoqnuPEXJ', 'n500ef48Ibat', 'LkFxTyBxEHWO', 1, '我也想加入!', 0, '2024-03-15 17:52:13', 1),
(5, '8BgBgtJkv5f7', 'vF1V9si8MRF6', 'n500ef48Ib22', 8, '再申請一個', 1, '2024-03-15 18:02:48', 0),
(6, 'QF2MrvdS5odH', '6yABeAhqFa6c', 'IxKTTfDkz3Bc', 3, '我彈琴超強', 2, '2024-03-26 09:43:21', 1),
(7, 'icNrYCOPoJLh', 'R8DjVBJJVCIi', 'IxKTTfDkz3Bc', 6, '李斯特再世就是我', 0, '2024-03-26 09:44:03', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `jam_apply`
--
ALTER TABLE `jam_apply`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `jam_apply`
--
ALTER TABLE `jam_apply`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
