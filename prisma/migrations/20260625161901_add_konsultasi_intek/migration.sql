-- CreateEnum
CREATE TYPE "public"."KonsultasiStatus" AS ENUM ('MENUNGGU_PEMBAYARAN', 'PEMBAYARAN_DITERIMA', 'SELESAI');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."UserRole" ADD VALUE 'ADMIN_KONSULTASI';
ALTER TYPE "public"."UserRole" ADD VALUE 'ADMIN_INTEK';

-- CreateTable
CREATE TABLE "public"."KonsultasiSubmission" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "noWhatsapp" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "alamatLokasi" TEXT,
    "status" "public"."KonsultasiStatus" NOT NULL DEFAULT 'MENUNGGU_PEMBAYARAN',
    "paymentProofUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KonsultasiSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MetodePembayaran" (
    "id" TEXT NOT NULL,
    "namaBank" TEXT NOT NULL,
    "nomorRekening" TEXT NOT NULL,
    "namaPemilik" TEXT NOT NULL,
    "deskripsi" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetodePembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IntekSubmission" (
    "id" TEXT NOT NULL,
    "namaInstalasi" TEXT NOT NULL,
    "dayaTerpasang" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tenagaTeknikLapangan" TEXT NOT NULL,
    "tenagaTeknikSistem" TEXT NOT NULL,
    "jenisProject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntekSubmission_pkey" PRIMARY KEY ("id")
);
