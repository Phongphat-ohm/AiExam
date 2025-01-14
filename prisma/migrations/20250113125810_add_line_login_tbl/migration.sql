-- CreateTable
CREATE TABLE "LineLogin" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "line_sub_id" TEXT NOT NULL,
    "connect_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LineLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LineLogin_id_key" ON "LineLogin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LineLogin_user_id_key" ON "LineLogin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "LineLogin_line_sub_id_key" ON "LineLogin"("line_sub_id");

-- AddForeignKey
ALTER TABLE "LineLogin" ADD CONSTRAINT "LineLogin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
