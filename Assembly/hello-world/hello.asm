section .data
        msg db 'Hello World!', 0xA
        len equ $- msg

section .text

global _start

_start:
        mov     EAX, 0x4
        mov     EBX, 0x1
        mov     ECX, msg
        mov     EDX, len
        int     0x80

        mov     EAX, 0x1
        mov     EBX, 0x0
        int     0x80
