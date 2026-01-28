<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            if (!Schema::hasColumn('employees', 'first_name')) {
                $table->string('first_name', 50)->after('office_id');
            }
            if (!Schema::hasColumn('employees', 'last_name')) {
                $table->string('last_name', 50)->after('first_name');
            }
            if (!Schema::hasColumn('employees', 'phone')) {
                $table->string('phone', 12)->nullable()->after('last_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            if (Schema::hasColumn('employees', 'first_name')) {
                $table->dropColumn('first_name');
            }
            if (Schema::hasColumn('employees', 'last_name')) {
                $table->dropColumn('last_name');
            }
            if (Schema::hasColumn('employees', 'phone')) {
                $table->dropColumn('phone');
            }
        });
    }
};
