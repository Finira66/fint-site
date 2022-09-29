<template>
    <transition name="fade">
        <div class="loader" v-if="visible">
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>    
    </transition>
</template>

<script>
    export default {
        props: {
            visible: {
                default: false,
            }
        }
    }
</script>

<style lang="scss">
    .loader {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: rgba(#243e6a, 0.6);
    }

    .spinner {
        animation: rotate 2s linear infinite;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -25px;
        width: 80px;
        height: 80px;
        
        & .path {
            stroke: #93bfec;
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
        }
        
        }

        @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
        }

        @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }

</style>