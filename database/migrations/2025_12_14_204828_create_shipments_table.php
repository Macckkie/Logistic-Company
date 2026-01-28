<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_address', 50)->nullable();
            $table->decimal('weight_kg', 10, 2);
            $table->decimal('price', 10, 2);
            $table->enum('status', ['registered', 'in transit', 'delivered']);
            $table->foreignId('sender_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreignId('receiver_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreignId('origin_office_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreignId('destination_office_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreignId('courier_id')->nullable()->references('id')->on('clients')->onDelete('cascade');
            $table->foreignId('registered_by')->references('id')->on('clients')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
