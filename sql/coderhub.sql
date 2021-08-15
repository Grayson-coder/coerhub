/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : coderhub

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 15/08/2021 10:58:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `comment_id` int(11) NULL DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (6, '你好呀，我叫佩奇', 10, 1, NULL, '2021-08-11 11:33:58', '2021-08-11 11:53:04');
INSERT INTO `comment` VALUES (7, '你好啊我是用户9', 9, 1, NULL, '2021-08-11 14:34:49', '2021-08-11 14:35:15');
INSERT INTO `comment` VALUES (8, '回复第6条评论', 11, 1, 6, '2021-08-11 14:36:28', '2021-08-11 14:37:52');
INSERT INTO `comment` VALUES (9, '讲得好啊', 12, 3, NULL, '2021-08-11 15:04:22', '2021-08-11 15:04:22');
INSERT INTO `comment` VALUES (10, '讲得好啊', 12, 3, NULL, '2021-08-11 15:19:14', '2021-08-11 15:19:14');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '前端', '2021-08-11 16:50:20', '2021-08-11 16:50:20');
INSERT INTO `label` VALUES (2, '后端', '2021-08-11 16:53:01', '2021-08-11 16:53:01');
INSERT INTO `label` VALUES (3, '文学', '2021-08-11 18:08:53', '2021-08-11 18:08:53');
INSERT INTO `label` VALUES (4, '青春', '2021-08-11 18:09:14', '2021-08-11 18:09:14');
INSERT INTO `label` VALUES (5, '热血', '2021-08-11 18:09:18', '2021-08-11 18:09:18');
INSERT INTO `label` VALUES (6, 'C语言', '2021-08-11 18:09:30', '2021-08-11 18:09:30');
INSERT INTO `label` VALUES (7, '编程', '2021-08-11 18:57:42', '2021-08-11 18:57:42');
INSERT INTO `label` VALUES (8, '开发语言', '2021-08-11 18:57:42', '2021-08-11 18:57:42');
INSERT INTO `label` VALUES (9, '高级语言', '2021-08-11 19:19:52', '2021-08-11 19:19:52');
INSERT INTO `label` VALUES (10, '动漫', '2021-08-11 19:20:47', '2021-08-11 19:20:47');
INSERT INTO `label` VALUES (11, '卡通', '2021-08-11 19:38:53', '2021-08-11 19:38:53');
INSERT INTO `label` VALUES (12, '激情', '2021-08-11 20:06:06', '2021-08-11 20:06:06');
INSERT INTO `label` VALUES (13, '草根逆袭', '2021-08-12 09:20:58', '2021-08-12 09:20:58');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `picture` varchar(999) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '纵然再苦手术百年 我的心意 始终如一', 9, '2021-08-10 15:26:12', '2021-08-15 09:45:47', 'http://localhost:8000/picture/1628991945747.png,http://localhost:8000/picture/1628991945747.jpg');
INSERT INTO `moment` VALUES (3, '不经巨大的困难，不会有伟大的事业。——伏尔泰', 11, '2021-08-10 15:26:12', '2021-08-11 11:02:33', NULL);
INSERT INTO `moment` VALUES (5, '苦难磨炼一些人，也毁灭另一些人。——富勒', 13, '2021-08-10 15:26:12', '2021-08-11 11:02:40', NULL);
INSERT INTO `moment` VALUES (6, '不要等待，时机永远不会恰到好处', 14, '2021-08-10 15:26:12', '2021-08-11 11:02:48', NULL);
INSERT INTO `moment` VALUES (7, '生命如同寓言，其价值不在与长短，而在与内容', 15, '2021-08-10 15:26:12', '2021-08-11 11:03:04', NULL);
INSERT INTO `moment` VALUES (8, '生命不可能有两次，但许多人连一次也不善于度过', 16, '2021-08-10 15:26:12', '2021-08-11 11:03:11', NULL);
INSERT INTO `moment` VALUES (9, '不幸可能成为通向幸福的桥梁', 9, '2021-08-10 15:43:53', '2021-08-11 11:03:18', NULL);
INSERT INTO `moment` VALUES (10, '大家好我叫张源', 9, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (11, '大家好我叫张源', 10, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (12, '大家好我叫张源', 11, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (13, '大家好我叫张源', 12, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (14, '大家好我叫张源', 13, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (15, '大家好我叫张源', 14, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (16, '大家好我叫张源', 15, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (17, '大家好我叫张源', 16, '2021-08-10 16:57:07', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (18, '大家好我叫张源', 9, '2021-08-10 17:06:53', '2021-08-10 19:06:14', NULL);
INSERT INTO `moment` VALUES (19, 'JAVA时世界上最好的语言123456', 15, '2021-08-15 09:44:21', '2021-08-15 09:44:21', NULL);

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `moment_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES (1, 1, 3, '2021-08-11 18:28:13', '2021-08-11 18:28:13');
INSERT INTO `moment_label` VALUES (2, 1, 7, '2021-08-11 20:05:09', '2021-08-11 20:05:09');
INSERT INTO `moment_label` VALUES (3, 1, 8, '2021-08-11 20:05:09', '2021-08-11 20:05:09');
INSERT INTO `moment_label` VALUES (4, 1, 6, '2021-08-11 20:05:09', '2021-08-11 20:05:09');
INSERT INTO `moment_label` VALUES (5, 1, 9, '2021-08-11 20:05:09', '2021-08-11 20:05:09');
INSERT INTO `moment_label` VALUES (6, 1, 11, '2021-08-11 20:05:09', '2021-08-11 20:05:09');
INSERT INTO `moment_label` VALUES (7, 1, 12, '2021-08-11 20:06:06', '2021-08-11 20:06:06');
INSERT INTO `moment_label` VALUES (8, 1, 13, '2021-08-12 09:20:58', '2021-08-12 09:20:58');
INSERT INTO `moment_label` VALUES (9, 3, 11, '2021-08-14 09:38:58', '2021-08-14 09:38:58');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (9, 'kobe', '124', '2021-07-30 18:32:05', '2021-08-15 09:52:34', 'http://localhost:8000/avatar/1628992354046.png');
INSERT INTO `users` VALUES (10, 'kobe123', '$2a$10$tbtBX0fQJa7UWGlqofXJPuTc/cGRL9Ky/o9CQv3Rr7Qt/0quaJ1Ye', '2021-07-30 18:55:17', '2021-08-15 09:52:47', 'http://localhost:8000/avatar/1628992367249.png');
INSERT INTO `users` VALUES (11, 'kobe1223', '$2a$10$rIFcOPRkxjlDJ/C860jo/.v0bXoCyHiPhwfjbopuGIQW9myDgTXRG', '2021-07-30 18:56:59', '2021-08-15 09:52:22', 'http://localhost:8000/avatar/1628992342473.png');
INSERT INTO `users` VALUES (12, 'kobe33', '$2a$10$IdT0q31kqezdB4YvMJ56aeBQVlM2oO8CkL8MF7U.p9D4XIZdOsO86', '2021-07-30 19:19:59', '2021-07-30 19:19:59', NULL);
INSERT INTO `users` VALUES (13, 'ppp', '$2a$10$uvsvhwFm8A2s3vtbAxt3k.an5Y/Jd6mmElq8KzH4MqsTdYX74CkIq', '2021-07-30 19:43:31', '2021-07-30 19:43:31', NULL);
INSERT INTO `users` VALUES (14, '11', '$2a$10$gtV2m5sHzUF.DvSGk5Sbg.5WrvBs6Sch.DNeJLX510A1gl.FEOPGy', '2021-07-30 19:46:33', '2021-07-30 19:46:33', NULL);
INSERT INTO `users` VALUES (15, '112', '$2a$10$SCCDJdjV851eQgOZBAmNgOfPUyfyHMtiLmjznomdB6GQx6TVERKB2', '2021-07-30 20:03:18', '2021-07-30 20:03:18', NULL);
INSERT INTO `users` VALUES (16, '117', '$2a$10$mN2CtZpO/nGAcwPJbuJhju1a/z6s/0CFhsZX0xZxwxbX.aTzgN3Gq', '2021-07-30 20:10:12', '2021-07-30 20:10:12', NULL);
INSERT INTO `users` VALUES (17, '118', '$2a$10$Vgfl9xOY1ymMOCCeBmNnsuZKjWsRxMjiT4pUps3HfEFgcPSaPkMcK', '2021-07-30 20:12:53', '2021-07-30 20:12:53', NULL);
INSERT INTO `users` VALUES (18, '115', '$2a$10$G3DfljhfYH6KeOH8Vivx4ON1jgRh23qgjO1AvnWpd.OqOeh3KznCS', '2021-07-31 16:24:56', '2021-07-31 16:24:56', NULL);
INSERT INTO `users` VALUES (19, '张三', '123456', '2021-08-10 16:57:07', '2021-08-10 16:57:07', NULL);
INSERT INTO `users` VALUES (20, '116', '$2a$10$pJhgZzztSY59CWD76i6f2.FfFn6WQDvdC7.3rL2nm.Uj6fjSEUO2S', '2021-08-15 09:43:52', '2021-08-15 09:43:52', NULL);

SET FOREIGN_KEY_CHECKS = 1;
