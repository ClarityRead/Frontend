import { useState, useEffect } from 'react'
import axios from 'axios'
import { domains } from '../constants'

function Paper() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900"></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}