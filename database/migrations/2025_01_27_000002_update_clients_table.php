<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            if (!Schema::hasColumn('clients', 'first_name')) {
                $table->string('first_name', 50)->after('company_id');
            }
            if (!Schema::hasColumn('clients', 'last_name')) {
                $table->string('last_name', 50)->after('first_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            if (Schema::hasColumn('clients', 'first_name')) {
                $table->dropColumn('first_name');
            }
            if (Schema::hasColumn('clients', 'last_name')) {
                $table->dropColumn('last_name');
            }
        });
    }
};
